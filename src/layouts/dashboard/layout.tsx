import { useCallback, useEffect, useState } from "react";
import AppHeader from "#srccomponents/my-header.tsx";
import { withAuthGuard } from "#srchocs/with-auth-guard.tsx";
import { decodeToken, decryptJSON } from "#srclib/utils.ts";
import { useAuth } from "#srchooks/use-auth.ts";

export const DashBoardLayout = withAuthGuard((props: any) => {
  const { children } = props;
  const auth = useAuth() as any;
  return (
    <>
      <AppHeader>{children}</AppHeader>
    </>
  );
});
