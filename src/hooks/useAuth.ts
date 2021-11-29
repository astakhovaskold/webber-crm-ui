import useAccount from './useAccount';

function useAuth(): boolean {
    const {account} = useAccount();
    return !!account;
}

export default useAuth;
