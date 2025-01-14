import { AccountTransactionList } from "@/components/accounts/AccountTransactionList";
import { BalanceHistoryGraph } from "@/components/accounts/BalanceHistoryGraph";
import { ClearingAccountDetail } from "@/components/accounts/ClearingAccountDetail";
import { Loading } from "@/components/style/Loading";
import { MobilePaper } from "@/components/style/mobile";
import { useQuery, useTitle } from "@/core/utils";
import { selectAccountSlice, selectGroupSlice, useAppSelector } from "@/store";
import { selectAccountById, selectGroupById } from "@abrechnung/redux";
import { Grid, Typography } from "@mui/material";
import * as React from "react";
import { Navigate, useParams } from "react-router-dom";
import { AccountInfo } from "./AccountInfo";
import { useTranslation } from "react-i18next";

interface Props {
    groupId: number;
}

const AccountEdit: React.FC<{ groupId: number; accountId: number }> = ({ groupId, accountId }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <MobilePaper>
                    <AccountInfo groupId={groupId} accountId={accountId} />
                </MobilePaper>
            </Grid>
        </Grid>
    );
};

export const AccountDetail: React.FC<Props> = ({ groupId }) => {
    const { t } = useTranslation();
    const params = useParams();
    const accountId = Number(params["id"]);

    const group = useAppSelector((state) => selectGroupById({ state: selectGroupSlice(state), groupId }));
    const account = useAppSelector((state) =>
        selectAccountById({ state: selectAccountSlice(state), groupId, accountId })
    );
    const query = useQuery();

    useTitle(
        t(account?.type === "clearing" ? "accounts.detail.tabTitleEvent" : "accounts.detail.tabTitleAccount", "", {
            group,
            account,
        })
    );

    if (account === undefined) {
        if (query.get("no-redirect") === "true") {
            return <Loading />;
        } else {
            return <Navigate to="/404" />;
        }
    }

    if (account.is_wip) {
        return <AccountEdit groupId={groupId} accountId={accountId} />;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <MobilePaper>
                    <AccountInfo groupId={groupId} accountId={accountId} />
                </MobilePaper>
            </Grid>
            {account.type === "personal" && (
                <Grid item xs={12}>
                    <MobilePaper>
                        <Typography variant="h6">{t("accounts.balanceOf", "", { account })}</Typography>
                        <BalanceHistoryGraph groupId={groupId} accountId={accountId} />
                    </MobilePaper>
                </Grid>
            )}
            {account.type === "clearing" && (
                <Grid item xs={12}>
                    <MobilePaper>
                        <Typography variant="h6">{t("accounts.clearingDistributionOf", "", { account })}</Typography>
                        <ClearingAccountDetail groupId={groupId} accountId={accountId} />
                    </MobilePaper>
                </Grid>
            )}
            <Grid item xs={12}>
                <MobilePaper>
                    <Typography variant="h6">{t("accounts.transactionsInvolving", "", { account })}</Typography>
                    <AccountTransactionList groupId={groupId} accountId={accountId} />
                </MobilePaper>
            </Grid>
        </Grid>
    );
};
