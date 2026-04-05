import { existsSync, readFileSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";

function extractPaths(obj: unknown): string[] {
    if (typeof obj === "string") return [obj];
    if (typeof obj !== "object" || obj === null) return [];
    return Object.values(obj).flatMap(extractPaths);
}

const pkg = JSON.parse(readFileSync("package.json", "utf8"));

describe("package exports", () => {
    const declaredPaths = [
        "build_bundles/esm/index.js",
        "build_bundles/esm/index.d.ts",
        "build_bundles/cjs/cr-com-lib.js",
        "build_bundles/umd/cr-com-lib.js",
        "build_bundles/umd/@types/index.d.ts",
    ];

    describe("declared paths exist on disk", () => {
        for (const p of declaredPaths) {
            it(p, () => {
                expect(existsSync(p), `Missing: ${p}`).toBe(true);
            });
        }
    });

    it("ESM bundle contains export statements", () => {
        const content = readFileSync("build_bundles/esm/index.js", "utf8");
        expect(content).toMatch(/\bexport\b/);
    });

    it("CJS bundle uses module.exports", () => {
        const content = readFileSync("build_bundles/cjs/cr-com-lib.js", "utf8");
        expect(content).toMatch(/module\.exports/);
    });

    // Fails in release CI if BUILD_VERSION was never injected into the workflow
    it.skipIf(!process.env.IS_RELEASE)(
        "BUILD_VERSION env var is set for release",
        () => {
            expect(
                process.env.BUILD_VERSION,
                "BUILD_VERSION must be set in the release pipeline",
            ).toBeTruthy();
        },
    );

    // Fails in release CI if BUILD_DATE was never injected into the workflow
    it.skipIf(!process.env.IS_RELEASE)(
        "BUILD_DATE env var is set for release",
        () => {
            expect(
                process.env.BUILD_DATE,
                "BUILD_DATE must be set in the release pipeline",
            ).toBeTruthy();
        },
    );

    // Only runs in release CI where BUILD_VERSION is injected into the bundle
    it.skipIf(!process.env.BUILD_VERSION)(
        "ESM bundle does not contain version placeholder",
        () => {
            const content = readFileSync("build_bundles/esm/index.js", "utf8");
            expect(content).not.toContain("VERSION_NOT_SET");
        },
    );

    // Only runs in release CI where BUILD_DATE is injected into the bundle
    it.skipIf(!process.env.BUILD_DATE)(
        "ESM bundle does not contain build date placeholder",
        () => {
            const content = readFileSync("build_bundles/esm/index.js", "utf8");
            expect(content).not.toContain("BUILD_DATE_INVALID");
        },
    );

    describe("all paths in package.json exports map exist on disk", () => {
        const exportPaths = extractPaths(pkg.exports).map((p) =>
            p.replace(/^\.\//, ""),
        );

        for (const p of exportPaths) {
            it(p, () => {
                expect(existsSync(p), `Missing export path: ${p}`).toBe(true);
            });
        }
    });

    describe("package.json main/module/types fields exist on disk", () => {
        for (const field of ["main", "module", "types"] as const) {
            it(`${field}: ${pkg[field]}`, () => {
                expect(
                    existsSync(pkg[field]),
                    `Missing ${field}: ${pkg[field]}`,
                ).toBe(true);
            });
        }
    });

    it("ESM type declaration is non-empty", () => {
        const { size } = statSync("build_bundles/esm/index.d.ts");
        expect(size).toBeGreaterThan(0);
    });

    describe("ESM bundle contains key named exports", () => {
        const keyExports = [
            // Signal API
            "publishEvent",
            "subscribeState",
            "unsubscribeState",
            // Native bridge — one per signal type (digital, analog, serial, object)
            "bridgeReceiveBooleanFromNative",
            "bridgeReceiveIntegerFromNative",
            "bridgeReceiveStringFromNative",
            "bridgeReceiveObjectFromNative",
            // Device detection
            "isCrestronTouchscreen",
            // Utilities
            "uriSchemaValidation",
            // Key classes
            "Ch5Button",
            "Ch5Signal",
            "Ch5SignalFactory",
            // Build metadata
            "version",
            "buildDate",
        ];

        const content = readFileSync("build_bundles/esm/index.js", "utf8");

        for (const name of keyExports) {
            it(name, () => {
                expect(content, `Missing export: ${name}`).toContain(name);
            });
        }
    });

    describe("ESM type declaration contains key type definitions", () => {
        const keyModules = [
            "./ch5-button/index",
            "./ch5-core/index",
            "./ch5-signal-level-gauge/index",
        ];

        const content = readFileSync("build_bundles/esm/index.d.ts", "utf8");

        for (const name of keyModules) {
            it(`re-exports ${name}`, () => {
                expect(content, `Missing re-export: ${name}`).toContain(name);
            });
        }
    });

    describe("package.json has required npm metadata", () => {
        const requiredFields = [
            "name",
            "version",
            "description",
            "license",
            "repository",
        ] as const;

        for (const field of requiredFields) {
            it(`has "${field}" field`, () => {
                expect(
                    pkg[field],
                    `Missing required package.json field: ${field}`,
                ).toBeTruthy();
            });
        }
    });
});
