/**
 * @file utils.ts — 공용 유틸리티 함수
 * @description Tailwind CSS 클래스를 안전하게 병합하는 유틸리티.
 *   clsx로 조건부 클래스를 결합하고, twMerge로 Tailwind 충돌을 해결합니다.
 *
 * @ai-context 모든 컴포넌트에서 className 조합 시 이 함수를 사용합니다.
 *   예: cn("text-white", isActive && "bg-mint", className)
 */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 조건부 Tailwind CSS 클래스를 안전하게 병합합니다.
 * @param inputs - clsx 호환 클래스 값 (문자열, 객체, 배열, 조건식)
 * @returns 병합 및 충돌 해결된 className 문자열
 * @example cn("p-4 bg-red-500", isActive && "bg-blue-500") // → "p-4 bg-blue-500"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
