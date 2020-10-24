CREATE TABLE "To-Do" (
  "id" serial primary key,
  "task" varchar(240),
  "task_completed" boolean
);

INSERT INTO "To-Do" ("task", "task_completed")
VALUES ('clean house', false), ('do laundry', false), ('finish homework', false), ('walk the dog', false),
('trim the hedges', false);

SELECT * FROM "To-Do" ORDER BY "task_completed";