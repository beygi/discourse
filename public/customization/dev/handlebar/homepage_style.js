<script type='text/x-handlebars' data-template-name='topic-list-header.raw'>
  {{raw "topic-list-header-column" order='posts' name='topic.title'}}
  
  {{#if showLikes}}
     {{raw "topic-list-header-column" sortable='true' order='likes' number='true' forceName='Likes'}}
  {{/if}}
  {{#if showOpLikes}}
     {{raw "topic-list-header-column" sortable='true' order='op_likes' number='true' forceName='Likes'}}
  {{/if}}
  {{raw "topic-list-header-column" sortable='true' number='true' order='posts' forceName='Replies'}}
  {{raw "topic-list-header-column" sortable='true' forceName='مطلب‌هایی برای شما'}}
</script>
