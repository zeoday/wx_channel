package handlers

import (
	"path/filepath"
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

