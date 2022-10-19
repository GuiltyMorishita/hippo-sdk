import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
export const packageName = 'aux';
export const moduleAddress = new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541');
export const moduleName = 'uint256';

export const E_OVERFLOW: U64 = u64('1001');
export const MAX_SHIFT: U8 = u8('255');
export const UNDERLYING_HALF_POINT: U128 = u128('170141183460469231731687303715884105728');
export const UNDERLYING_HALF_SIZE: U8 = u8('64');
export const UNDERLYING_LOWER_ONES: U128 = u128('18446744073709551615');
export const UNDERLYING_ONES: U128 = u128('340282366920938463463374607431768211455');
export const UNDERLYING_SIZE: U8 = u8('128');
export const UNDERLYING_UPPER_ONES: U128 = u128('340282366920938463444927863358058659840');

export class Uint256 {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'Uint256';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'hi', typeTag: AtomicTypeTag.U128 },
    { name: 'lo', typeTag: AtomicTypeTag.U128 }
  ];

  hi: U128;
  lo: U128;

  constructor(proto: any, public typeTag: TypeTag) {
    this.hi = proto['hi'] as U128;
    this.lo = proto['lo'] as U128;
  }

  static Uint256Parser(data: any, typeTag: TypeTag, repo: AptosParserRepo): Uint256 {
    const proto = $.parseStructProto(data, typeTag, repo, Uint256);
    return new Uint256(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'Uint256', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function downcast_(x: Uint256, $c: AptosDataCache): U128 {
  if (!!underlying_overflow_($.copy(x), $c)) {
    throw $.abortCode($.copy(E_OVERFLOW));
  }
  return $.copy(x.lo);
}

export function new___(hi: U128, lo: U128, $c: AptosDataCache): Uint256 {
  return new Uint256({ hi: $.copy(hi), lo: $.copy(lo) }, new SimpleStructTag(Uint256));
}

export function underlying_add_with_carry_(x: U128, y: U128, $c: AptosDataCache): [U128, U128] {
  let temp$1, temp$2, r;
  r = $.copy(UNDERLYING_ONES).sub($.copy(x));
  if ($.copy(r).lt($.copy(y))) {
    [temp$1, temp$2] = [$.copy(y).sub($.copy(r)).sub(u128('1')), u128('1')];
  } else {
    [temp$1, temp$2] = [$.copy(x).add($.copy(y)), u128('0')];
  }
  return [temp$1, temp$2];
}

export function underlying_mul_to_uint256_(x: U128, y: U128, $c: AptosDataCache): Uint256 {
  let hi, lo;
  [lo, hi] = underlying_mul_with_carry_($.copy(x), $.copy(y), $c);
  return new___($.copy(hi), $.copy(lo), $c);
}

export function underlying_mul_with_carry_(x: U128, y: U128, $c: AptosDataCache): [U128, U128] {
  let hi, lo, lo__1, lo_carry_1, lo_carry_2, xh, xhyl, xl, xlyh, yh, yl;
  xh = $.copy(x).and($.copy(UNDERLYING_UPPER_ONES)).shr($.copy(UNDERLYING_HALF_SIZE));
  xl = $.copy(x).and($.copy(UNDERLYING_LOWER_ONES));
  yh = $.copy(y).and($.copy(UNDERLYING_UPPER_ONES)).shr($.copy(UNDERLYING_HALF_SIZE));
  yl = $.copy(y).and($.copy(UNDERLYING_LOWER_ONES));
  xhyl = $.copy(xh).mul($.copy(yl));
  xlyh = $.copy(xl).mul($.copy(yh));
  [lo, lo_carry_1] = underlying_add_with_carry_(
    $.copy(xl).mul($.copy(yl)),
    $.copy(xhyl).and($.copy(UNDERLYING_LOWER_ONES)).shl($.copy(UNDERLYING_HALF_SIZE)),
    $c
  );
  [lo__1, lo_carry_2] = underlying_add_with_carry_(
    $.copy(lo),
    $.copy(xlyh).and($.copy(UNDERLYING_LOWER_ONES)).shl($.copy(UNDERLYING_HALF_SIZE)),
    $c
  );
  hi = $.copy(xh)
    .mul($.copy(yh))
    .add($.copy(xhyl).shr($.copy(UNDERLYING_HALF_SIZE)))
    .add($.copy(xlyh).shr($.copy(UNDERLYING_HALF_SIZE)))
    .add($.copy(lo_carry_1))
    .add($.copy(lo_carry_2));
  return [$.copy(lo__1), $.copy(hi)];
}

export function underlying_overflow_(x: Uint256, $c: AptosDataCache): boolean {
  return $.copy(x.hi).neq(u128('0'));
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541::uint256::Uint256',
    Uint256.Uint256Parser
  );
}
export class App {
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {}
  get moduleAddress() {
    {
      return moduleAddress;
    }
  }
  get moduleName() {
    {
      return moduleName;
    }
  }
  get Uint256() {
    return Uint256;
  }
}
