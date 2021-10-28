import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import click from '@ember/test-helpers/dom/click';
import ENV from 'cosmology-class/config/environment';

module('Integration | Component | livefeed', function (hooks) {
  setupRenderingTest(hooks);

  test('Displaying liveStream', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Livefeed::Livefeed/>`);

    assert.dom('.liveStream').doesNotExist();

    await click('.liveButton');

    const credentials = '' + encodeURIComponent(ENV.SRT_username) + ':' + encodeURIComponent(ENV.SRT_password);
    let url = '10.162.60.78/ISAPI/Streaming/channels/102/httpPreview' 
    assert.dom('.liveStream').exists();
    assert.dom('.liveStream .title')
        .exists()
        .hasText("Live look at the telescope");
    assert.dom('.liveStream .feed .video')
        .exists()
        .hasAttribute('src', `http://${credentials}@${url}`);

    await click('.liveButton');

    assert.dom('.liveStream').doesNotExist();

  });
});
