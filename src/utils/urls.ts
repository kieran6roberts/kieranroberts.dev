
export const formatPathname = ({ pathname }: { pathname?: string }) => {
 const pathnameHasTrailingSlash =
 pathname && pathname.length > 1 && pathname?.endsWith("/");

 return pathnameHasTrailingSlash
 ? pathname?.slice(0, -1)
 : pathname;
};