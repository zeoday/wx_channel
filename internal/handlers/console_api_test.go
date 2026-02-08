package handlers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"strings"
	"testing"
)

func TestIsPathWithinBase(t *testing.T) {
	base := filepath.Clean(filepath.Join("C:", "downloads"))

	tests := []struct {
		name   string
		target string
		want   bool
	}{
		{
			name:   "base directory itself",
			target: base,
			want:   true,
		},
		{
			name:   "file inside base directory",
			target: filepath.Join(base, "author", "video.mp4"),
			want:   true,
		},
		{
			name:   "path traversal outside base",
			target: filepath.Clean(filepath.Join(base, "..", "Windows", "system.ini")),
			want:   false,
		},
		{
			name:   "sibling directory",
			target: filepath.Clean(filepath.Join(filepath.Dir(base), "other", "video.mp4")),
			want:   false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := isPathWithinBase(base, tt.target)
			if got != tt.want {
				t.Fatalf("isPathWithinBase(%q, %q) = %v, want %v", base, tt.target, got, tt.want)
			}
		})
	}
}

func TestHandleQueueFail_InvalidJSONReturnsBadRequest(t *testing.T) {
	handler := &ConsoleAPIHandler{}
	req := httptest.NewRequest(http.MethodPut, "/api/queue/test-id/fail", strings.NewReader("{"))
	rr := httptest.NewRecorder()

	handler.HandleQueueFail(rr, req, "test-id")

	if rr.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rr.Code, http.StatusBadRequest)
	}

	var resp APIResponse
	if err := json.Unmarshal(rr.Body.Bytes(), &resp); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}
	if resp.Success {
		t.Fatalf("success = true, want false")
	}
	if resp.Error != "invalid request body" {
		t.Fatalf("error = %q, want %q", resp.Error, "invalid request body")
	}
}

func TestValidateVideoPlayTargetURL(t *testing.T) {
	tests := []struct {
		name      string
		rawURL    string
		wantError bool
	}{
		{
			name:      "valid https url",
			rawURL:    "https://example.com/video.mp4",
			wantError: false,
		},
		{
			name:      "invalid scheme",
			rawURL:    "file:///tmp/video.mp4",
			wantError: true,
		},
		{
			name:      "localhost blocked",
			rawURL:    "http://localhost/video.mp4",
			wantError: true,
		},
		{
			name:      "private ipv4 blocked",
			rawURL:    "http://192.168.1.20/video.mp4",
			wantError: true,
		},
		{
			name:      "loopback ipv6 blocked",
			rawURL:    "http://[::1]/video.mp4",
			wantError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			_, err := validateVideoPlayTargetURL(tt.rawURL)
			gotError := err != nil
			if gotError != tt.wantError {
				t.Fatalf("validateVideoPlayTargetURL(%q) error = %v, wantError=%v", tt.rawURL, err, tt.wantError)
			}
		})
	}
}

func TestHandleVideoPlay_BlockedLocalAddress(t *testing.T) {
	handler := &ConsoleAPIHandler{}
	req := httptest.NewRequest(http.MethodGet, "/api/video/play?url=http://127.0.0.1/video.mp4", nil)
	rr := httptest.NewRecorder()

	handler.HandleVideoPlay(rr, req)

	if rr.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rr.Code, http.StatusBadRequest)
	}

	var resp APIResponse
	if err := json.Unmarshal(rr.Body.Bytes(), &resp); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}
	if resp.Success {
		t.Fatalf("success = true, want false")
	}
	if !strings.Contains(resp.Error, "local/private") {
		t.Fatalf("error = %q, want contains %q", resp.Error, "local/private")
	}
}
