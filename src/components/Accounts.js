import React from "react";

const Accounts = ({accounts, rates, filteredByCountry}) => {
    // displaying the data table of account according to IbanFirst
    function formatAmount(amount) {
        return Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'})
            .format(amount);
    }

    function convertToEuro(account) {
        if (account.currency !== 'EUR') {
            return parseFloat(account.amount) * rates.find(rate => rate.instrument === account.currency).rate;
        } else {
            return parseFloat(account.amount);
        }
    }

    const filteredAccounts = accounts.filter(account => {
        if (filteredByCountry === "") return true;
        return account.holderBank.address.country === filteredByCountry;
    });

    return (
        <table className="table table-bordered">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Tag</th>
                <th scope="col">Account Number</th>
                <th scope="col">BIC</th>
                <th scope="col">Amount</th>
            </tr>
            </thead>
            <tbody>
            {filteredAccounts.map(account => (
                <tr key={account}>
                    <th scope="row">{account.id}</th>
                    <td>{account.tag}</td>
                    <td>{account.accountNumber}</td>
                    <td>{account.holderBank.bic}</td>
                    <td>{formatAmount(convertToEuro(account))}</td>
                </tr>
            ))}
            <tr>
                <td colSpan={4} className="text-left"><b>TOTAL</b></td>
                <td>{formatAmount(filteredAccounts
                    .reduce((sum, account) => sum + parseFloat(account.amount), 0))}</td>
            </tr>
            </tbody>
        </table>
    );
};

export default Accounts;