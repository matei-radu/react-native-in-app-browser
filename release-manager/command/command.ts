/*
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

export interface Option {
  flags: string
  description: string
}
export interface Command {
  command: string
  description: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (...args: any) => void
  options: Option[]
}
