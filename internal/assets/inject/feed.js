/**
 * @file Feed页面功能模块 - 视频详情页下载按钮注入
 */
console.log('[feed.js] 加载Feed页面模块');

// ==================== Feed页面下载按钮注入 ====================

/** 注入Feed页面顶部工具栏按钮 */
async function __insert_download_btn_to_feed_toolbar() {
  // 查找顶部工具栏容器
  var findToolbarContainer = function () {
    // 尝试多种选择器
    var container = document.querySelector('div[data-v-bf57a568].flex.items-center');
    if (container) return container;

    var parent = document.querySelector('div.flex-initial.flex-shrink-0.pl-6');
    if (parent) {
      container = parent.querySelector('.flex.items-center');
      if (container) return container;
    }

    // 尝试查找包含相机图标的容器
    var cameraIcon = document.querySelector('svg[data-v-bf57a568]');
    if (cameraIcon) {
      var current = cameraIcon;
      while (current && current.parentElement) {
        current = current.parentElement;
        if (current.classList && current.classList.contains('flex') && current.classList.contains('items-center')) {
          return current;
        }
      }
    }

    return null;
  };

  var tryInject = function () {
    var container = findToolbarContainer();
    if (!container) return false;

    // 检查是否已存在
    if (container.querySelector('#wx-feed-comment-icon') || container.querySelector('#wx-feed-download-icon')) {
      console.log('[feed.js] 工具栏按钮已存在');
      return true;
    }

    // 创建评论图标
    var commentIconWrapper = document.createElement('div');
    commentIconWrapper.id = 'wx-feed-comment-icon';
    commentIconWrapper.className = 'mr-4 h-6 w-6 flex-initial flex-shrink-0 text-fg-0 cursor-pointer';
    commentIconWrapper.title = '采集评论';
    // SVG: 气泡 Icon (Outline style, stroke-width=1.5)
    commentIconWrapper.innerHTML = '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';

    commentIconWrapper.onclick = function () {
      if (window.__wx_channels_start_comment_collection) {
        window.__wx_channels_start_comment_collection();
      }
    };

    // 创建下载图标
    var downloadIconWrapper = document.createElement('div');
    downloadIconWrapper.id = 'wx-feed-download-icon';
    downloadIconWrapper.className = 'mr-4 h-6 w-6 flex-initial flex-shrink-0 text-fg-0 cursor-pointer';
    downloadIconWrapper.title = '下载视频';
    // SVG: 下载 Icon (Outline style, stroke-width=1.5)
    downloadIconWrapper.innerHTML = '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';

    downloadIconWrapper.onclick = function () {
      __handle_feed_download_click();
    };

    // Create Export icon
    var exportIconWrapper = document.createElement('div');
    exportIconWrapper.id = 'wx-feed-export-icon';
    exportIconWrapper.className = 'mr-4 h-6 w-6 flex-initial flex-shrink-0 text-fg-0 cursor-pointer';
    exportIconWrapper.title = '导出CSV';
    // SVG: 文件 Icon (Outline style, stroke-width=1.5)
    exportIconWrapper.innerHTML = '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>';

    exportIconWrapper.onclick = function () {
      __handle_export_click();
    };

    // Insert into container
    container.insertBefore(exportIconWrapper, container.firstChild);
    container.insertBefore(downloadIconWrapper, container.firstChild);
    container.insertBefore(commentIconWrapper, container.firstChild);

    console.log('[feed.js] ✅ 工具栏按钮注入成功');
    __wx_log({ msg: "注入评论和下载按钮成功!" });
    return true;
  };

  // 立即尝试注入
  if (tryInject()) return true;

  // 如果失败，使用 MutationObserver 监听 DOM 变化
  return new Promise(function (resolve) {
    var observer = new MutationObserver(function (mutations, obs) {
      if (tryInject()) {
        obs.disconnect();
        resolve(true);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // 5秒后超时
    setTimeout(function () {
      observer.disconnect();
      console.log('[feed.js] 工具栏按钮注入超时');
      resolve(false);
    }, 5000);
  });
}

/** Feed页面下载按钮点击处理 */
function __handle_feed_download_click() {
  var profile = window.__wx_channels_store__ && window.__wx_channels_store__.profile;

  if (!profile) {
    __wx_log({ msg: '⏳ 正在获取视频数据，请稍候...' });

    // 等待数据
    var checkCount = 0;
    var maxChecks = 30;
    var checkData = function () {
      profile = window.__wx_channels_store__ && window.__wx_channels_store__.profile;
      if (profile) {
        __show_feed_download_options(profile);
      } else {
        checkCount++;
        if (checkCount < maxChecks) {
          setTimeout(checkData, 100);
        } else {
          __wx_log({ msg: '❌ 获取视频数据超时\n请刷新页面重试' });
        }
      }
    };
    checkData();
    return;
  }

  __show_feed_download_options(profile);
}

/** Feed页面下载选项菜单 */
function __show_feed_download_options(profile) {
  console.log('[feed.js] 显示下载选项菜单', profile);

  // 移除已存在的菜单
  var existingMenu = document.getElementById('wx-download-menu');
  if (existingMenu) existingMenu.remove();
  var existingOverlay = document.getElementById('wx-download-overlay');
  if (existingOverlay) existingOverlay.remove();

  var menu = document.createElement('div');
  menu.id = 'wx-download-menu';
  menu.style.cssText = 'position:fixed;top:60px;right:20px;z-index:99999;background:#2b2b2b;color:#e5e5e5;border-radius:8px;padding:0;width:280px;box-shadow:0 8px 24px rgba(0,0,0,0.5);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-size:14px;';

  var title = profile.title || '未知视频';
  var shortTitle = title.length > 30 ? title.substring(0, 30) + '...' : title;

  var html = '';

  // 标题栏
  html += '<div style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.08);">';
  html += '<div style="font-size:15px;font-weight:500;color:#fff;margin-bottom:8px;">下载选项</div>';
  html += '<div style="font-size:13px;color:#999;line-height:1.4;">' + shortTitle + '</div>';
  html += '</div>';

  // 选项区域
  html += '<div style="padding:16px 20px;">';

  // 视频下载选项
  if (profile.spec && profile.spec.length > 0) {
    html += '<div style="margin-bottom:12px;font-size:12px;color:#999;">选择画质:</div>';
    profile.spec.forEach(function (spec, index) {
      var label = spec.fileFormat || ('画质' + (index + 1));
      if (spec.width && spec.height) {
        label += ' (' + spec.width + 'x' + spec.height + ')';
      }
      html += '<div class="download-option" data-index="' + index + '" style="padding:10px 16px;margin:8px 0;background:rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;text-align:center;transition:background 0.2s;font-size:13px;">' + label + '</div>';
    });
  } else {
    html += '<div class="download-option" data-index="-1" style="padding:10px 16px;margin:8px 0;background:rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;text-align:center;font-size:13px;">下载视频</div>';
  }

  // 封面下载
  html += '<div class="download-cover" style="padding:10px 16px;margin:8px 0;background:rgba(7,193,96,0.15);color:#07c160;border-radius:6px;cursor:pointer;text-align:center;font-size:13px;font-weight:500;">下载封面</div>';

  html += '</div>';

  // 底部按钮
  html += '<div style="padding:12px 20px;border-top:1px solid rgba(255,255,255,0.08);">';
  html += '<div class="close-menu" style="padding:8px;text-align:center;cursor:pointer;color:#999;font-size:13px;">取消</div>';
  html += '</div>';

  menu.innerHTML = html;
  document.body.appendChild(menu);

  // 添加遮罩
  var overlay = document.createElement('div');
  overlay.id = 'wx-download-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:99998;';
  document.body.appendChild(overlay);

  function closeMenu() {
    menu.remove();
    overlay.remove();
  }

  // 绑定事件
  menu.querySelectorAll('.download-option').forEach(function (el) {
    el.onmouseover = function () { this.style.background = 'rgba(255,255,255,0.15)'; };
    el.onmouseout = function () { this.style.background = 'rgba(255,255,255,0.08)'; };
    el.onclick = function () {
      var index = parseInt(this.getAttribute('data-index'));
      var spec = index >= 0 && profile.spec ? profile.spec[index] : null;
      closeMenu();
      __wx_channels_handle_click_download__(spec);
    };
  });

  var coverBtn = menu.querySelector('.download-cover');
  coverBtn.onmouseover = function () { this.style.background = 'rgba(7,193,96,0.25)'; };
  coverBtn.onmouseout = function () { this.style.background = 'rgba(7,193,96,0.15)'; };
  coverBtn.onclick = function () {
    closeMenu();
    __wx_channels_handle_download_cover();
  };

  menu.querySelector('.close-menu').onclick = closeMenu;
  overlay.onclick = closeMenu;
}

/** Feed页面按钮注入入口 */
async function __insert_download_btn_to_feed_page() {
  console.log('[feed.js] 开始注入Feed页面按钮到顶部工具栏...');

  var success = await __insert_download_btn_to_feed_toolbar();
  if (success) return true;

  console.log('[feed.js] 未找到Feed页面工具栏');
  return false;
}

/** Feed页面导出按钮点击处理 */
async function __handle_export_click() {
  console.log('[feed.js] 点击导出CSV');

  try {
    // 检查依赖
    if (typeof WXU === 'undefined') {
      throw new Error('WXU 工具库未加载');
    }

    // 移除外部依赖，使用原生方式下载
    // if (typeof saveAs === 'undefined') { ... }

    __wx_log({ msg: '⏳ 正在导出下载记录...' });

    const headers = {};
    if (window.__WX_LOCAL_TOKEN__) {
      headers['X-Local-Auth'] = window.__WX_LOCAL_TOKEN__;
    }

    const response = await fetch('/api/export/downloads?format=csv', {
      headers: headers
    });

    if (!response.ok) throw new Error('导出请求失败: ' + response.status + ' ' + response.statusText);

    const blob = await response.blob();
    const filename = `wx_channels_downloads_${new Date().toISOString().slice(0, 10)}.csv`;

    // 使用原生方式保存文件 (替代 FileSaver.js)
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }

    __wx_log({ msg: '✅ 导出成功: ' + filename });
  } catch (e) {
    console.error('[feed.js] Export error:', e);

    var errorMsg = e.message || String(e);
    // 处理加载脚本错误的特殊对象
    if (typeof e === 'object' && e.isTrusted) {
      errorMsg = "依赖脚本加载失败 (Network Error)";
    }

    if (typeof __wx_log === 'function') {
      __wx_log({ msg: '❌ 导出失败: ' + errorMsg });
    }
    alert('导出失败: ' + errorMsg);
  }
}

console.log('[feed.js] Feed页面模块加载完成');
