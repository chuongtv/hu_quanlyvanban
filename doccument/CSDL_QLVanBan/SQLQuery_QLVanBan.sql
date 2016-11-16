GO
CREATE TABLE [dbo].[DanhMuc] (
    [DanhMucID] Integer IDENTITY (1, 1)  NOT NULL,
    [TenDanhMuc] Nvarchar (1000)  NULL,
    [TenDanhMucKhongDau] Nvarchar (1000) NULL,
	[LFT] Integer NULL,
	[RGT] Integer NULL,
	[IsActive] Bit NULL,
	[CreatedDate] Datetime NULL,
	[UpdatedDate] Datetime NULL,
    PRIMARY KEY CLUSTERED ([DanhMucID] ASC)
);

CREATE TABLE [dbo].[VanBan] (
	[VanBanID] Integer IDENTITY (1, 1) NOT NULL,
	[TieuDe] Nvarchar (2000) NULL,
	[TieuDeKhongDau] Nvarchar (2000) NULL,
	[SoVanBan] Nvarchar (200),
	[TomTatNoiDung] Text NULL,
	[TomTatNoiDungKhongDau] Text NULL,
	[CreatedDate] Datetime NULL,
	[CreatedUser] Nvarchar (1000) NULL,
	[UpdatedDate] Datetime NULL,
	[UpdatedUser] Nvarchar (1000) NULL,
	[IsPublish] Bit NULL,
	[GhimLenDau] Bit NULL,
	[Tag] Nvarchar (1000) NULL,
	[PublishDate] Datetime NULL,
	PRIMARY KEY CLUSTERED ([VanBanID] ASC)
);

CREATE TABLE [dbo].[FileVanBan] (
	[FileID] BigInt IDENTITY (1, 1) NOT NULL,
	[VanBanID] Integer NOT NULL,
	[FileName] Nvarchar (1000) NULL,
	[FileType] Nvarchar (20) NULL,
	[FileSize] BigInt NULL,
	[ClientFileName] Nvarchar (2000) NULL,
	[ServerFileName] Nvarchar (1000) NULL,
	[UpdatedDate] Datetime NULL,
	[UpdatedUser] Nvarchar (1000) NULL,
	[MapPath] Nvarchar (2000) NULL,
	[PageNumber] Integer NULL,
	[DownloadCount] Integer NULL,
	PRIMARY KEY CLUSTERED ([FileID] ASC)
);
