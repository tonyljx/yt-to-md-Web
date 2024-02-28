-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "videoId" VARCHAR(255),
    "chapters" JSONB,
    "subtitle" JSONB,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
