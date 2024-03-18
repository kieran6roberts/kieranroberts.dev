export enum PrefetchStrategyEnum {
 TAP = "tap",
 HOVER = "hover",
 VIEWPORT = "viewport",
 LOAD = "load",
}

export type PrefetchStrategy = `${PrefetchStrategyEnum}`;