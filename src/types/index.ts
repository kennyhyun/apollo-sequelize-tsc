type Response<T> = T | Promise<T> | PromiseLike<T>;

export interface RootResolvers {
  ip: () => Response<void>;
}

export interface Context {
  request: any
}
