(function($) {
  var form, project, version, status, lastCommentDate, dateDiff, closeSid;

  if (location.host != 'drupal.org') return;

  form = $('#comment-form');
  if (form.length == 0) return;

  version = $('#edit-project-info-rid option:selected', form).text();
  if (version[0] > 5) return;

  status = $('#edit-sid option:selected', form).text();
  if (status.indexOf('closed') === 0 || status.indexOf('fixed') === 0) {
    $('.flag-project-issue-follow a.unflag-action').trigger('click');
    return;
  }

  lastCommentDate = $('.submitted:last em').text();
  lastCommentDate = lastCommentDate.split(' at ')[0];
  lastCommentDate = lastCommentDate.replace(lastCommentDate.split(' ')[0], lastCommentDate.split(' ')[0].substr(0, 3));
  lastCommentDate = new Date(Date.parse(lastCommentDate));
  dateDiff = (new Date().getTime() - lastCommentDate.getTime()) / 1000;
  if (dateDiff < 60*60*30*6 && !window.confirm('The issue has been updated since less than 6 month. Continue ?')) return;

  closeSid = $('#edit-sid option[text="closed (won\'t fix)"]', form).val();
  project = $('#edit-project-info-project-title', form).val();

  $('#edit-sid', form).val(closeSid);
  $('#edit-comment', form).val(
    'This version of ' + project + ' is not supported anymore. ' +
    'The issue is closed for this reason.\n' +
    'Please upgrade to a supported version and feel free to reopen the issue ' +
    'on the new version if applicable.\n' +
    '\n' +
    '<em>This issue has been automagically closed by <a href="https://github.com/DuaelFr/cleandrupal">a script</a>.</em>');
  $('#edit-submit', form).trigger('click');
})(jQuery);
