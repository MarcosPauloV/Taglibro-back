import { PartialType } from "@nestjs/mapped-types";
import { CreateAssessmentDto } from "./create-assesment.dto";

export class UpdateAssesmentDto extends PartialType(CreateAssessmentDto) {}
