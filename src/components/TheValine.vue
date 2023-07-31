<script setup lang="ts">
onMounted(async () => {
  const Valine = (await import('valine')).default
  // eslint-disable-next-line no-new
  new Valine({
    el: '#valine-comments',
    app_id: 'kdLBgGeN6AO23LTQWDAqRttz-9Nh9j0Va',
    app_key: 'hWmkOGBqEpSlw81Gbqn4CSuF',
    path: window.location.pathname,
    avatar: 'identicon',
    placeholder: '给我的文章加点评论吧~',
    recordIP: true,
  })
})
</script>

<template>
  <div id="valine-comments" />
  <div class="flex justify-end gap2 text-3">
    <span class="op50">Powered By</span>
    <a href="https://valine.js.org" target="_blank" class="op50 hover:op100">Valine</a>
  </div>
</template>

<style scoped>
#valine-comments :deep(.vinput), #valine-comments :deep(.vquote), #valine-comments :deep(.vimg)  {
  --uno: btn-border;
}

#valine-comments :deep(.vwrap)  {
  --uno: border-zinc/20;
}

#valine-comments :deep(.vbtn)  {
  --uno: btn-border;
  color: inherit;
}

#valine-comments :deep(a.vicon)  {
  cursor: help;
}
#valine-comments :deep(.vicon)  {
  opacity: 0.5;
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
#valine-comments :deep(.vicon:hover)  {
  opacity: 0.8;
}

#valine-comments :deep(a)  {
  color: inherit;
}
#valine-comments :deep(a:hover)  {
  opacity: 80%;
}

#valine-comments :deep(.vh), :deep(.vquote) {
  border: none !important;
}

#valine-comments :deep(.vempty) {
  text-align: left;
  padding: 1rem 0;
  color: transparent;
  user-select: none;
  pointer-events: none;
}

#valine-comments :deep(.vempty::before) {
  content: '暂无评论，快来抢沙发吧~';
  color: #80808080;
}

#valine-comments :deep(.vpower) {
  display: none;
}

#valine-comments :deep(.vnick:hover) {
  color: inherit;
}

#valine-comments :deep(.vat) {
  color: inherit;
  opacity: 0.5;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}
#valine-comments :deep(.vat::before) {
  content: '';
  display: inline-block;
  --at-apply: i-carbon-reply;
  font-size: 0.75em;
}
#valine-comments :deep(.vat:hover) {
  opacity: 0.8;
}
</style>
