import { pgTable, varchar, text } from "drizzle-orm/pg-core";

export const mockInterview = pgTable("mock_interview", {
  mockId: varchar("mock_id", { length: 255 }).primaryKey(),

  jobPosition: varchar("job_position", { length: 255 }),

  jobDesc: text("job_desc"),

  jobExperience: varchar("job_experience", { length: 50 }),

  jsonMockResp: text("json_mock_resp"),

  userId: varchar("user_id", { length: 255 }),

  createdAt: varchar("created_at", { length: 50 }),
});