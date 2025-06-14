import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core"

export const upload = pgTable("upload", {
  id: varchar("id").primaryKey().notNull(),
  file_url: varchar("file_url").notNull(),
  email: varchar("email"),
  ip_address: varchar("ip_address").notNull(),
  updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(() => new Date()),
  created_at: timestamp("created_at").defaultNow().notNull(),
})

export const summary = pgTable("summary", {
  id: varchar("id").primaryKey().notNull(),
  rich_text: varchar("rich_text").notNull(),
  upload_id: varchar("upload_id").references(() => upload.id, { onDelete: "cascade" }),
  updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(() => new Date()),
  created_at: timestamp("created_at").defaultNow().notNull(),
})

export const feedback = pgTable("feedback", {
  id: varchar("id").primaryKey().notNull(),
  comment: varchar("comment").notNull(),
  ip_address: varchar("ip_address").notNull(),
})

export type Upload = typeof upload.$inferSelect
export type Summary = typeof summary.$inferSelect
export type Feedback = typeof feedback.$inferSelect
