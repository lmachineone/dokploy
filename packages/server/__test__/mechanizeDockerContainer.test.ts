import { beforeEach, describe, expect, it, vi } from "vitest";

const inspectMock = vi.fn(() => Promise.reject(new Error("service not found")));
const getServiceMock = vi.fn(() => ({ inspect: inspectMock }));
const createServiceMock = vi.fn(async () => undefined);

vi.mock("../src/utils/servers/remote-docker", () => ({
        getRemoteDocker: vi.fn(async () => ({
                getService: getServiceMock,
                createService: createServiceMock,
        })),
}));

import {
        mechanizeDockerContainer,
        type ApplicationNested,
} from "../src/utils/builders";

describe("mechanizeDockerContainer", () => {
        beforeEach(() => {
                inspectMock.mockClear();
                getServiceMock.mockClear();
                createServiceMock.mockClear();
        });

        it("passes a numeric StopGracePeriod when provided as bigint", async () => {
                const application = {
                        appName: "test-app",
                        env: null,
                        mounts: [],
                        cpuLimit: null,
                        memoryLimit: null,
                        memoryReservation: null,
                        cpuReservation: null,
                        command: null,
                        ports: [],
                        sourceType: "docker",
                        dockerImage: "example:latest",
                        registry: null,
                        environment: {
                                project: { env: null },
                                env: null,
                        },
                        replicas: 1,
                        stopGracePeriodSwarm: 0n,
                        serverId: null,
                } as unknown as ApplicationNested;

                await mechanizeDockerContainer(application);

                expect(createServiceMock).toHaveBeenCalledTimes(1);
                const [settings] = createServiceMock.mock.calls[0];
                expect(settings.StopGracePeriod).toBe(0);
                expect(typeof settings.StopGracePeriod).toBe("number");
        });
});
