import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
export const packageName = "LiquidSwapInterface";
export const moduleAddress = new HexString("0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9");
export const moduleName = "lp";



export class LP 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "LP";
  static typeParameters: TypeParamDeclType[] = [
    { name: "X", isPhantom: true },
    { name: "Y", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "dummy_field", typeTag: AtomicTypeTag.Bool }];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static LPParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : LP {
    const proto = $.parseStructProto(data, typeTag, repo, LP);
    return new LP(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, "LP", $p);
  }

}
export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::lp::LP", LP.LPParser);
}
export class App {
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
  ) {
  }
}

