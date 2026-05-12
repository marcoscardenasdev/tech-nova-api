import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";

import { envs } from "src/config";
import { PrismaService } from "src/prisma.service";
import { JwtPayload } from "../interfaces/jwt-payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly prismaService: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: envs.jwtSecret,
        });
    }

    async validate(payload: JwtPayload) {

        const { id } = payload;

        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            }
        });

        if ( !user ) {
            throw new UnauthorizedException('Invalid token');
        }

        return user;
    }
}