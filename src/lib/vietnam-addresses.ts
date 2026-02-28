const BASE = "https://provinces.open-api.vn/api";

export interface VietnamProvince {
  code: number;
  name: string;
}

export interface VietnamDistrict {
  code: number;
  name: string;
  province_code: number;
}

export interface VietnamWard {
  code: number;
  name: string;
  district_code: number;
}

export async function getProvinces(): Promise<VietnamProvince[]> {
  const res = await fetch(`${BASE}/`);
  if (!res.ok) throw new Error("Failed to fetch provinces");
  const data = (await res.json()) as Array<{ code: number; name: string }>;
  return data.map((p) => ({ code: p.code, name: p.name }));
}

export async function getDistricts(provinceCode: number): Promise<VietnamDistrict[]> {
  const res = await fetch(`${BASE}/p/${provinceCode}?depth=2`);
  if (!res.ok) return [];
  const data = (await res.json()) as { districts: Array<{ code: number; name: string; province_code: number }> };
  return (data.districts ?? []).map((d) => ({ code: d.code, name: d.name, province_code: d.province_code }));
}

export async function getWards(districtCode: number): Promise<VietnamWard[]> {
  const res = await fetch(`${BASE}/d/${districtCode}?depth=2`);
  if (!res.ok) return [];
  const data = (await res.json()) as { wards: Array<{ code: number; name: string; district_code: number }> };
  return (data.wards ?? []).map((w) => ({ code: w.code, name: w.name, district_code: w.district_code }));
}
