using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ntdai09102015.quanlyfile.library;
namespace project.web.mvc.Views
{
    public class FileModalView
    {
        public FileModalView() { }
        public List<FileSystem> ListFilesUploaded { get; set; }
        public string ItemGuid { get; set; }
        public string Path { get; set; }
        public string Id { get; set; }
        public string AutoUpload { get; set; }
        public string IsDelete { get; set; }
        public string SubModel { get; set; }
    }
}