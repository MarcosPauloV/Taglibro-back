import { AssesmentType } from "@prisma/client";

export class CreateAssessmentDto {
  moduleId: string;
  userId: string;
  assesmentName: string;
  type: AssesmentType;
  frequency?: number;
  grade?: number;
}
