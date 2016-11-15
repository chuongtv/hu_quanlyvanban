/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */


CKEDITOR.editorConfig = function( config ) {
    config.toolbarGroups = [
       { name: 'clipboard', groups: ['clipboard', 'undo'] },
       { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
       { name: 'links', groups: ['links'] },
       { name: 'insert', groups: ['insert'] },
       { name: 'forms', groups: ['forms'] },
       { name: 'document', groups: ['mode', 'document', 'doctools'] },
       { name: 'others', groups: ['others'] },
       '/',
       { name: 'tools', groups: ['tools'] },
       { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
       { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
       { name: 'styles', groups: ['styles'] },
       { name: 'colors', groups: ['colors'] },
       { name: 'about', groups: ['about'] }
    ];

    config.removeButtons = 'Underline,Subscript,Superscript,Cut,Image,Source,Undo,Link,Scayt,Styles,Format,Unlink,Anchor,HorizontalRule,Table,SpecialChar,Copy,Paste,PasteText,PasteFromWord,Redo';

	
};




//CKEDITOR.editorConfig = function (config) {
//    config.contentsCss = [CKEDITOR.basePath + 'contents.css', '/styles/base.css'];

//    config.extraPlugins = 'balisespedago';
//    config.toolbar = 'UPToolbar';

//    config.toolbar_UPToolbar =
//    [
//        ['Preview'],
//        ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Scayt'],
//        ['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat'],
//        ['Image', 'Flash', 'Table', 'HorizontalRule', 'SpecialChar', 'PageBreak'],
//        '/',
//        ['BalisesPedago', 'Styles', 'Format'],
//        ['Bold', 'Italic', 'Strike'],
//        ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'],
//        ['Link', 'Unlin k', 'Anchor'],
//        ['Maximize', '-', 'About']
//    ];

//    config.filebrowserBrowseUrl = '/projects/pictures';
//    config.filebrowserUploadUrl = '/projects/pictures';
//    config.filebrowserImageWindowWidth = '60%';
//    config.filebrowserImageWindowHeight = '60%';

//    config.fullPage = true;
//    config.entities = false;
//    config.toolbarCanCollapse = false;
//    config.height = '600px';
//};