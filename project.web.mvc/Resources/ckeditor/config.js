/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */


CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config
    
    //config.basePath = "~/Resources/ckeditor/";

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';

	//config.contentsCss = [CKEDITOR.basePath + 'contents.css'];
	//config.filebrowserBrowseUrl = '/projects/pictures';
    //config.filebrowserUploadUrl = '/projects/pictures';
	
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