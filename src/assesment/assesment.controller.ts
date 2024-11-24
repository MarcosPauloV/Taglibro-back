import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { AssesmentService } from "./assesment.service";
import { CreateAssessmentDto } from "./dto/create-assesment.dto";
import { UserBranchGuard } from "src/auth/guards/user-branch.guard";
import { AccessRole, CurrentBranch } from "src/branch-user/branch.decorator";
import { Role } from "src/branch-user/entities/branch-user.entity";
import { CurrentToken } from "src/auth/jwt.decorator";
import { JwtPayload } from "src/auth/entities/jwt-token";

@UseGuards(UserBranchGuard)
@Controller("assesment")
export class AssesmentController {
  constructor(private readonly assesmentService: AssesmentService) {}

  @AccessRole(Role.USER)
  @Post()
  async create(
    @Body() createAssesmentDto: CreateAssessmentDto,
    @CurrentToken() token: JwtPayload,
    @CurrentBranch() branchId: string
  ) {
    return await this.assesmentService.create(createAssesmentDto, token.accountId, branchId);
  }

  @AccessRole(Role.USER)
  @Get("user/:userId")
  async findByUser(@Param("userId") userId: string) {
    return await this.assesmentService.findByUser(userId);
  }

  @AccessRole(Role.USER)
  @Get("module/:moduleId")
  async findByModule(@Param("moduleId") moduleId: string) {
    return await this.assesmentService.findByModule(moduleId);
  }
}
