IF DB_ID('ordermangmentsystemproject') IS NULL
    CREATE DATABASE ordermangmentsystemproject;
GO
USE [ordermangmentsystemproject]
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 11/26/2026 2:19:27 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[CustomerID] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [varchar](100) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Phone] [varchar](20) NULL,
	[Address] [varchar](200) NULL,
	[RegistrationDate] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CustomerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[orders]    Script Date: 11/26/2026 2:19:27 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders](
	[OrderID] [int] IDENTITY(1,1) NOT NULL,
	[ProductID] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[OrderDate] [date] NOT NULL,
	[Status] [varchar](30) NOT NULL,
	[CustomerID] [int] NOT NULL,
 CONSTRAINT [PK_orders] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 11/26/2026 2:19:27 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[ProductID] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [varchar](100) NOT NULL,
	[Category] [varchar](50) NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[StockQuantity] [int] NOT NULL,
	[Stock] [int] NOT NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Customers] ON 

INSERT [dbo].[Customers] ([CustomerID], [FullName], [Email], [Phone], [Address], [RegistrationDate]) VALUES (1, N'Ahmed Ali', N'ahmed@gmail.com', N'01012345679', N'Alexandria', CAST(N'2026-11-19' AS Date))
INSERT [dbo].[Customers] ([CustomerID], [FullName], [Email], [Phone], [Address], [RegistrationDate]) VALUES (3, N'Omar Hassan', N'omar@gmail.com', N'01112345678', N'Giza', CAST(N'2026-11-19' AS Date))
INSERT [dbo].[Customers] ([CustomerID], [FullName], [Email], [Phone], [Address], [RegistrationDate]) VALUES (4, N'Basmala Alaa', N'basmala@example.com', NULL, NULL, CAST(N'2026-11-19' AS Date))
INSERT [dbo].[Customers] ([CustomerID], [FullName], [Email], [Phone], [Address], [RegistrationDate]) VALUES (5, N'Fatima Hassan', N'fatima.hassan@yahoo.com', N'01112345678', N'Alexandria', CAST(N'2026-02-20' AS Date))
INSERT [dbo].[Customers] ([CustomerID], [FullName], [Email], [Phone], [Address], [RegistrationDate]) VALUES (6, N'Sara Kamel', N'sara.kamel@gmail.com', N'01009876543', N'Cairo', CAST(N'2026-04-05' AS Date))
INSERT [dbo].[Customers] ([CustomerID], [FullName], [Email], [Phone], [Address], [RegistrationDate]) VALUES (7, N'Omar El-Sayed', N'omar.elsayed@yahoo.com', N'01118765432', N'Giza', CAST(N'2026-05-12' AS Date))
INSERT [dbo].[Customers] ([CustomerID], [FullName], [Email], [Phone], [Address], [RegistrationDate]) VALUES (8, N'Mona Adel', N'mona.adel@gmail.com', N'01223456789', N'Alexandria', CAST(N'2026-06-18' AS Date))
INSERT [dbo].[Customers] ([CustomerID], [FullName], [Email], [Phone], [Address], [RegistrationDate]) VALUES (9, N'Karim Alaa', N'karimalaa@gmail.com', N'01286936671', N'alex el agmay', CAST(N'2026-11-21' AS Date))
INSERT [dbo].[Customers] ([CustomerID], [FullName], [Email], [Phone], [Address], [RegistrationDate]) VALUES (10, N'Test Customer', N'test.customer@example.com', N'01000000000', N'Alexandria', CAST(N'2026-11-25' AS Date))
SET IDENTITY_INSERT [dbo].[Customers] OFF
GO
SET IDENTITY_INSERT [dbo].[orders] ON 

INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (15, 3, 1, CAST(N'2026-10-11' AS Date), N'Pending ', 4)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (17, 5, 2, CAST(N'2026-11-11' AS Date), N'Shipped', 1)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (19, 6, 2, CAST(N'2026-12-11' AS Date), N'Shipped', 3)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (26, 10, 1, CAST(N'2026-06-03' AS Date), N'Delivered', 5)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (27, 12, 1, CAST(N'2026-06-11' AS Date), N'Delivered', 6)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (28, 14, 2, CAST(N'2026-06-20' AS Date), N'Delivered', 7)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (29, 16, 3, CAST(N'2026-07-02' AS Date), N'Delivered', 8)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (30, 5, 2, CAST(N'2026-07-09' AS Date), N'Shipped', 5)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (31, 11, 1, CAST(N'2026-07-15' AS Date), N'Delivered', 6)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (32, 6, 1, CAST(N'2026-08-01' AS Date), N'Cancelled', 7)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (33, 13, 2, CAST(N'2026-08-10' AS Date), N'Delivered', 8)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (34, 3, 1, CAST(N'2026-08-22' AS Date), N'Delivered', 5)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (35, 15, 1, CAST(N'2026-09-04' AS Date), N'Shipped', 6)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (36, 10, 1, CAST(N'2026-09-13' AS Date), N'Delivered', 7)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (37, 12, 1, CAST(N'2026-09-25' AS Date), N'Pending', 8)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (38, 16, 4, CAST(N'2026-10-02' AS Date), N'Delivered', 5)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (39, 3, 1, CAST(N'2026-10-11' AS Date), N'Shipped', 6)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (40, 11, 1, CAST(N'2026-10-19' AS Date), N'Delivered', 7)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (41, 5, 2, CAST(N'2026-10-27' AS Date), N'Cancelled', 8)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (42, 14, 1, CAST(N'2026-11-03' AS Date), N'Pending', 5)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (43, 6, 2, CAST(N'2026-11-08' AS Date), N'Shipped', 6)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (44, 13, 1, CAST(N'2026-11-14' AS Date), N'Pending', 7)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (45, 10, 1, CAST(N'2026-11-17' AS Date), N'Pending', 8)
INSERT [dbo].[orders] ([OrderID], [ProductID], [Quantity], [OrderDate], [Status], [CustomerID]) VALUES (46, 11, 1, CAST(N'2026-11-21' AS Date), N'Shipped', 4)
SET IDENTITY_INSERT [dbo].[orders] OFF
GO
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([ProductID], [ProductName], [Category], [Price], [StockQuantity], [Stock]) VALUES (3, N'Laptop', N'Computers', CAST(25000.00 AS Decimal(18, 2)), 15, 15)
INSERT [dbo].[Products] ([ProductID], [ProductName], [Category], [Price], [StockQuantity], [Stock]) VALUES (5, N'Mouse', N'Accessories', CAST(400.00 AS Decimal(18, 2)), 80, 80)
INSERT [dbo].[Products] ([ProductID], [ProductName], [Category], [Price], [StockQuantity], [Stock]) VALUES (6, N'Keyboard', N'Accessories', CAST(750.00 AS Decimal(18, 2)), 60, 60)
INSERT [dbo].[Products] ([ProductID], [ProductName], [Category], [Price], [StockQuantity], [Stock]) VALUES (7, N'Headphones', N'Accessories', CAST(1200.00 AS Decimal(18, 2)), 15, 26)
INSERT [dbo].[Products] ([ProductID], [ProductName], [Category], [Price], [StockQuantity], [Stock]) VALUES (10, N'Samsung Galaxy S24', N'Mobiles', CAST(45000.00 AS Decimal(18, 2)), 25, 6)
INSERT [dbo].[Products] ([ProductID], [ProductName], [Category], [Price], [StockQuantity], [Stock]) VALUES (11, N'iPhone 15', N'Mobiles', CAST(52000.00 AS Decimal(18, 2)), 12, 11)
INSERT [dbo].[Products] ([ProductID], [ProductName], [Category], [Price], [StockQuantity], [Stock]) VALUES (12, N'Apple Watch S9', N'Wearables', CAST(28500.00 AS Decimal(18, 2)), 18, 3)
INSERT [dbo].[Products] ([ProductID], [ProductName], [Category], [Price], [StockQuantity], [Stock]) VALUES (13, N'Dell Laptop Stand', N'Accessories', CAST(1200.00 AS Decimal(18, 2)), 42, 9)
INSERT [dbo].[Products] ([ProductID], [ProductName], [Category], [Price], [StockQuantity], [Stock]) VALUES (14, N'HP Monitor 24"', N'Computers', CAST(6500.00 AS Decimal(18, 2)), 9, 50)
INSERT [dbo].[Products] ([ProductID], [ProductName], [Category], [Price], [StockQuantity], [Stock]) VALUES (15, N'Wireless Headphones', N'Audio', CAST(2300.00 AS Decimal(18, 2)), 0, 3)
INSERT [dbo].[Products] ([ProductID], [ProductName], [Category], [Price], [StockQuantity], [Stock]) VALUES (16, N'USB-C Charger', N'Accessories', CAST(450.00 AS Decimal(18, 2)), 120, 4)
INSERT [dbo].[Products] ([ProductID], [ProductName], [Category], [Price], [StockQuantity], [Stock]) VALUES (18, N'Test Product', N'Test', CAST(100.00 AS Decimal(18, 2)), 5, 5)
INSERT [dbo].[Products] ([ProductID], [ProductName], [Category], [Price], [StockQuantity], [Stock]) VALUES (19, N'iphone 17 pro max ', N'Mobiles', CAST(100000.00 AS Decimal(18, 2)), 0, 20)
SET IDENTITY_INSERT [dbo].[Products] OFF
GO
ALTER TABLE [dbo].[Customers] ADD  CONSTRAINT [DF_Customers_RegDate]  DEFAULT (getdate()) FOR [RegistrationDate]
GO
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_Stock]  DEFAULT ((0)) FOR [Stock]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Customers] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[Customers] ([CustomerID])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FK_Orders_Customers]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FK_orders_Products] FOREIGN KEY([ProductID])
REFERENCES [dbo].[Products] ([ProductID])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FK_orders_Products]
GO
