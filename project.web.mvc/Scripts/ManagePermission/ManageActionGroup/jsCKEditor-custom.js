CKEDITOR.editorConfig = function (config) {
    config.toolbarGroups = [
       //{ name: 'clipboard', groups: ['clipboard', 'undo'] },
       //{ name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
       //{ name: 'links', groups: ['links'] },
       //{ name: 'insert', groups: ['insert'] },
       //{ name: 'forms', groups: ['forms'] },
       //{ name: 'document', groups: ['mode', 'document', 'doctools'] },
       //{ name: 'others', groups: ['others'] },
       //'/',
       { name: 'tools', groups: ['tools'] },
       { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
       { name: 'paragraph', groups: ['list', 'indent', 'align', 'paragraph'] },
       { name: 'styles', groups: ['styles'] },
       { name: 'colors', groups: ['colors'] }
       //,
       //{ name: 'about', groups: ['about'] }
    ];

    config.removeButtons = 'Underline,Subscript,Superscript,Cut,Image,Source,Undo,Link,Scayt,Styles,Format,Unlink,Anchor,HorizontalRule,Table,SpecialChar,Copy,Paste,PasteText,PasteFromWord,Redo';


};