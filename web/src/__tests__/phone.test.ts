import { describe, expect, it } from "bun:test";
import { formatUzbekPhone, isUzbekPhoneValid, getCleanPhoneDigits } from "@/lib/phone";

describe("Uzbekistan Phone Number Formatter & Validator", () => {
  it("formats standard phone input correctly", () => {
    expect(formatUzbekPhone("901234567")).toBe("+998 (90) 123-45-67");
    expect(formatUzbekPhone("+998901234567")).toBe("+998 (90) 123-45-67");
    expect(formatUzbekPhone("+998 90 123 45 67")).toBe("+998 (90) 123-45-67");
  });

  it("handles partial input smoothly", () => {
    expect(formatUzbekPhone("")).toBe("+998");
    expect(formatUzbekPhone("9")).toBe("+998 (9");
    expect(formatUzbekPhone("90")).toBe("+998 (90)");
    expect(formatUzbekPhone("901")).toBe("+998 (90) 1");
    expect(formatUzbekPhone("90123")).toBe("+998 (90) 123");
    expect(formatUzbekPhone("901234")).toBe("+998 (90) 123-4");
    expect(formatUzbekPhone("9012345")).toBe("+998 (90) 123-45");
    expect(formatUzbekPhone("90123456")).toBe("+998 (90) 123-45-6");
    expect(formatUzbekPhone("901234567")).toBe("+998 (90) 123-45-67");
  });

  it("filters out alphabetical and symbol characters", () => {
    expect(formatUzbekPhone("90 abc 123 def 45 67")).toBe("+998 (90) 123-45-67");
    expect(formatUzbekPhone("random text")).toBe("+998");
  });

  it("caps numbers at 9 subscriber digits", () => {
    expect(formatUzbekPhone("90123456789999")).toBe("+998 (90) 123-45-67");
  });

  it("validates phone numbers strictly", () => {
    expect(isUzbekPhoneValid("+998 (90) 123-45-67")).toBe(true);
    expect(isUzbekPhoneValid("+998901234567")).toBe(true);
    expect(isUzbekPhoneValid("+998 (55) 702-40-40")).toBe(true);
    expect(isUzbekPhoneValid("+998 (90) 123-45-6")).toBe(false); // only 8 digits
    expect(isUzbekPhoneValid("+998")).toBe(false);
    expect(isUzbekPhoneValid("123456789012")).toBe(false); // doesn't start with 998
  });

  it("extracts clean phone digits", () => {
    expect(getCleanPhoneDigits("+998 (90) 123-45-67")).toBe("998901234567");
  });
});
