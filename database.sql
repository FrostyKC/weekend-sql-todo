CREATE TABLE "To-Do" (
  "id" serial primary key,
  "task" varchar(240),
  "task_completed" varchar(10)
);

INSERT INTO "To-Do" ("task", "task_completed")
VALUES ('clean house', 'No'), ('do laundry', 'No'), ('finish homework', 'No')
