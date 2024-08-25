import { AuthService } from "@/fake-backend/backend-auth.service";

export const clientAuthService = {
    login: async (account: any) => {
        return AuthService.login(account)
    },

    register: async (account: any) => {
        return AuthService.register(account)
    },
}
