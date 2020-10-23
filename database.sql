CREATE TABLE "To-Do" (
  "id" serial primary key,
  "task" varchar(240)
);

INSERT INTO "To-Do" ("task")
VALUES ('clean house'), ('do laundry'), ('finish homework')
