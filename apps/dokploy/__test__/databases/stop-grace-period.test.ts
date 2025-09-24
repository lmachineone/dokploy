import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildMariadb } from "@dokploy/server/utils/databases/mariadb";
import { buildMongo } from "@dokploy/server/utils/databases/mongo";
import { buildMysql } from "@dokploy/server/utils/databases/mysql";
import { buildPostgres } from "@dokploy/server/utils/databases/postgres";
import { buildRedis } from "@dokploy/server/utils/databases/redis";

vi.mock("@dokploy/server/utils/servers/remote-docker", () => ({
        getRemoteDocker: vi.fn(),
}));

import { getRemoteDocker } from "@dokploy/server/utils/servers/remote-docker";

const getRemoteDockerMock = vi.mocked(getRemoteDocker);

const dockerMock = {
        getService: vi.fn(),
        createService: vi.fn(),
};

const STOP_GRACE_PERIOD = 10n;

const createEnvironment = () => ({
        env: "",
        environmentId: "env",
        name: "Env",
        createdAt: "",
        description: "",
        projectId: "proj",
        project: {
                env: "",
                organizationId: "org",
                name: "Project",
                description: "",
                createdAt: "",
                projectId: "proj",
        },
});

const createSwarmDefaults = () => ({
        healthCheckSwarm: null,
        restartPolicySwarm: null,
        placementSwarm: null,
        updateConfigSwarm: null,
        rollbackConfigSwarm: null,
        modeSwarm: null,
        labelsSwarm: null,
        networkSwarm: null,
        stopGracePeriodSwarm: STOP_GRACE_PERIOD,
        mounts: [],
        replicas: 1,
});

const expectStopGracePeriodInTask = () => {
        expect(dockerMock.createService).toHaveBeenCalledTimes(1);
        const settings = dockerMock.createService.mock.calls[0][0];
        expect(settings.StopGracePeriod).toBeUndefined();
        expect(settings.TaskTemplate?.StopGracePeriod).toBe(STOP_GRACE_PERIOD);
};

beforeEach(() => {
        vi.clearAllMocks();
        dockerMock.createService.mockResolvedValue(undefined);
        dockerMock.getService.mockReturnValue({
                inspect: vi.fn().mockRejectedValue(new Error("not found")),
        });
        getRemoteDockerMock.mockResolvedValue(dockerMock as any);
});

describe("database builders StopGracePeriod", () => {
        it("includes StopGracePeriod for Postgres", async () => {
                await buildPostgres({
                        postgresId: "pg",
                        name: "Postgres",
                        appName: "postgres-app",
                        env: "",
                        externalPort: null,
                        dockerImage: "postgres:15",
                        memoryLimit: null,
                        memoryReservation: null,
                        cpuLimit: null,
                        cpuReservation: null,
                        databaseName: "db",
                        databaseUser: "user",
                        databasePassword: "pass",
                        command: null,
                        environment: createEnvironment(),
                        serverId: null,
                        ...createSwarmDefaults(),
                } as any);

                expectStopGracePeriodInTask();
        });

        it("includes StopGracePeriod for MySQL", async () => {
                await buildMysql({
                        mysqlId: "mysql",
                        name: "Mysql",
                        appName: "mysql-app",
                        env: "",
                        externalPort: null,
                        dockerImage: "mysql:8",
                        memoryLimit: null,
                        memoryReservation: null,
                        cpuLimit: null,
                        cpuReservation: null,
                        databaseName: "db",
                        databaseUser: "user",
                        databasePassword: "pass",
                        databaseRootPassword: "root",
                        command: null,
                        environment: createEnvironment(),
                        serverId: null,
                        ...createSwarmDefaults(),
                } as any);

                expectStopGracePeriodInTask();
        });

        it("includes StopGracePeriod for MariaDB", async () => {
                await buildMariadb({
                        mariadbId: "mariadb",
                        name: "MariaDB",
                        appName: "mariadb-app",
                        env: "",
                        externalPort: null,
                        dockerImage: "mariadb:6",
                        memoryLimit: null,
                        memoryReservation: null,
                        cpuLimit: null,
                        cpuReservation: null,
                        databaseName: "db",
                        databaseUser: "user",
                        databasePassword: "pass",
                        databaseRootPassword: "root",
                        command: null,
                        environment: createEnvironment(),
                        serverId: null,
                        ...createSwarmDefaults(),
                } as any);

                expectStopGracePeriodInTask();
        });

        it("includes StopGracePeriod for Mongo", async () => {
                await buildMongo({
                        mongoId: "mongo",
                        name: "Mongo",
                        appName: "mongo-app",
                        env: "",
                        externalPort: null,
                        dockerImage: "mongo:7",
                        memoryLimit: null,
                        memoryReservation: null,
                        cpuLimit: null,
                        cpuReservation: null,
                        databaseUser: "user",
                        databasePassword: "pass",
                        command: null,
                        replicaSets: false,
                        environment: createEnvironment(),
                        serverId: null,
                        ...createSwarmDefaults(),
                } as any);

                expectStopGracePeriodInTask();
        });

        it("includes StopGracePeriod for Redis", async () => {
                await buildRedis({
                        redisId: "redis",
                        name: "Redis",
                        appName: "redis-app",
                        env: "",
                        externalPort: null,
                        dockerImage: "redis:8",
                        memoryLimit: null,
                        memoryReservation: null,
                        cpuLimit: null,
                        cpuReservation: null,
                        databasePassword: "pass",
                        command: null,
                        environment: createEnvironment(),
                        serverId: null,
                        ...createSwarmDefaults(),
                } as any);

                expectStopGracePeriodInTask();
        });
});
