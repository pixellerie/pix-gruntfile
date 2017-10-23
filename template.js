/*
 * pix-gruntfile
 * http://pixellerie.com/
 *
 * Copyright (c) 2017 Daniel Hüttenmeister, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a basic Gruntfile.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template tries to guess file and directory paths, but ' +
  'you will most likely need to edit the generated Gruntfile.js file before ' +
  'running grunt. _If you run grunt after generating the Gruntfile, and ' +
  'it exits with errors, edit the file!_';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'Gruntfile.js';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    init.prompt('name'),
    init.prompt('title'),
    init.prompt('description', ''),
    init.prompt('version', '0.0.1'),
    init.prompt('licenses'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url', 'http://pixellerie.com'),
    {
      name: 'min_concat',
      message: 'Will files be concatenated or minified?',
      default: 'Y/n',
      warning: 'Yes: min + concat tasks. No: nothing to see here.'
    },
    {
      name: 'sass',
      message: 'Will you use sass?',
      default: 'Y/n',
      warning: 'Yes: compass task. No: nothing to see here.'
    }

  ], function(err, props) {
    props.min_concat = /y/i.test(props.min_concat);
    props.sass = /y/i.test(props.sass);

    var devDependencies = {
      'grunt': '~0.4.5',
      'grunt-contrib-watch': '~0.6.1'
    };

    if(props.min_concat) {
      devDependencies['grunt-contrib-concat'] = '~0.4.0';
      devDependencies['grunt-contrib-uglify'] = '~0.5.0';
    }

    if(props.sass) {
      devDependencies["grunt-contrib-compass"] = "~1.1.1";
    }

    props.devDependencies = devDependencies;
    props.node_version = '>= 0.10.0';

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: 'libs/**'});

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', props);

    // All done!
    done();

  });

};
