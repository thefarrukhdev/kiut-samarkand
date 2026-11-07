import React from "react";

export const metadata = {
  title: "Boshqaruv Paneli — KIUT Samarqand Filiali",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
