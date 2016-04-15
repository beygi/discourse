<script>
  var ApplicationRoute = require('discourse/routes/application').default;    
  ApplicationRoute.reopen({
    actions: {
      createTopic: function() {
          var Composer = require('discourse/models/composer').default;
          composerController = Discourse.__container__.lookup('controller:composer');
          composerController.open({ action: Composer.CREATE_TOPIC, draftKey: Composer.DRAFT });
      },
    }
  });
</script>
  
<script type='text/x-handlebars' data-template-name='/connectors/header-before-notifications/create-new-topic'>
  {{#if currentUser}}
    {{d-button  id="create-topic"
                  class="btn-default"
                  action="createTopic"
                  icon="plus"
                  label="topic.create"
                  disabled=cannotCreateTopicOnCategory}}
  {{/if}}
</script>