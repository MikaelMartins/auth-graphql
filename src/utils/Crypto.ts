import argon2 from "argon2"

export const hash = (value: string) => argon2.hash(value)
export const verify = (hashValue: string, value: string) => argon2.verify(hashValue, value)