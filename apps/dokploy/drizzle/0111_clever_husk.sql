ALTER TABLE "postgres" ADD COLUMN IF NOT EXISTS "stopGracePeriodSwarm" bigint;
ALTER TABLE "mysql" ADD COLUMN IF NOT EXISTS "stopGracePeriodSwarm" bigint;
ALTER TABLE "mariadb" ADD COLUMN IF NOT EXISTS "stopGracePeriodSwarm" bigint;
ALTER TABLE "mongo" ADD COLUMN IF NOT EXISTS "stopGracePeriodSwarm" bigint;
ALTER TABLE "redis" ADD COLUMN IF NOT EXISTS "stopGracePeriodSwarm" bigint;
