import { Account } from '../../../generated/schema';
import { getOrCreateProtocol } from '../protocol';

export function getOrCreateAccount(accountId: string): Account {
    let account = Account.load(accountId);
    if (!account) {
        account = new Account(accountId);
        account.save();

        const protocol = getOrCreateProtocol();
        const accountIds = protocol.accountIds;
        accountIds.push(accountId);
        protocol.accountIds = accountIds;

        protocol.save();
    }
    return account;
}
