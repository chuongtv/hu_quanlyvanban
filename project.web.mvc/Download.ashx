<%@ WebHandler Language="C#" Class="Download" %>
using System;
using System.IO;
using System.Web;
using System.Collections.Generic;
//using ICSharpCode.SharpZipLib.Zip;
using project.config.library;
using ntdai09102015.quanlyfile.library;
public class Download : IHttpHandler
{   
    public void ProcessRequest(HttpContext context)
    {
        // Get the file name from the query string
        string queryFile = context.Request.QueryString["id"];
     
        
        Guid itemGuid ;
        try { itemGuid = new Guid(queryFile); }
        catch
        {
            itemGuid = Guid.Empty;
        }
            
        
        // Ensure that we were passed a file name
        if (string.IsNullOrEmpty(queryFile))
            throw new HttpException(404, null);
        
            //load file trong csdl
            IFileSystemBAL itemFileBal = new FileSystemBAL();
            FileSystem file = itemFileBal.GetFileSystem(itemGuid);


            string Name = nvn.Library.Helpers.TiengVietHelper.RemoveSignForVietnameseString(file.ClientFileName).Replace(' ', '_');
            // Generate the server file name        
            string fileurl = Path.Combine(context.Server.MapPath("~/" + file.MapPath+"/"), file.ServerFileName);

            // Ensure that the file exists
            if (!File.Exists(fileurl))
                throw new HttpException(404, null);

            // Set the content type
            // TODO: set based on extension
            context.Response.ContentType = "*";
            context.Response.ContentType = "text/plain";

            // Set the filename
            context.Response.AddHeader("content-disposition", "attachment;filename=HUTECH-" + Name);

            // Stream the file to the client
            context.Response.WriteFile(fileurl); 
    }


    
    public bool IsReusable
    {
        get { return true; }
    }
}