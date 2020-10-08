import _ from "lodash";
import React from "react";

import { CreateBins, validateBinsCfg } from "./CreateBins";
import { CreateDatetime, validateDatetimeCfg } from "./CreateDatetime";
import { CreateNumeric, validateNumericCfg } from "./CreateNumeric";
import { CreateRandom, validateRandomCfg } from "./CreateRandom";
import { CreateString, validateStringCfg } from "./CreateString";
import { CreateTransform, validateTransformCfg } from "./CreateTransform";
import { CreateTypeConversion, validateTypeConversionCfg } from "./CreateTypeConversion";
import { CreateWinsorize, validateWinsorizeCfg } from "./CreateWinsorize";
import { CreateZScoreNormalize, validateZScoreNormalizeCfg } from "./CreateZScoreNormalize";

export const TYPES = _.concat(
  ["numeric", "string", "bins", "datetime", "random", "type_conversion", "transform", "winsorize", "zscore_normalize"],
  []
);
export const LABELS = { zscore_normalize: "Z-Score Normalize" };

export function buildLabel(v) {
  if (_.has(LABELS, v)) {
    return LABELS[v];
  }
  return _.join(_.map(_.split(v, "_"), _.capitalize), " ");
}

export function validateCfg(type, cfg) {
  switch (type) {
    case "datetime":
      return validateDatetimeCfg(cfg);
    case "string":
      return validateStringCfg(cfg);
    case "bins":
      return validateBinsCfg(cfg);
    case "random":
      return validateRandomCfg(cfg);
    case "type_conversion":
      return validateTypeConversionCfg(cfg);
    case "transform":
      return validateTransformCfg(cfg);
    case "winsorize":
      return validateWinsorizeCfg(cfg);
    case "zscore_normalize":
      return validateZScoreNormalizeCfg(cfg);
    case "numeric":
      return validateNumericCfg(cfg);
  }
  return null;
}

export function getBody(state, props, updateState) {
  switch (state.type) {
    case "numeric":
      return <CreateNumeric {..._.pick(state, ["columns", "namePopulated"])} updateState={updateState} />;
    case "string":
      return <CreateString {..._.pick(state, ["columns", "namePopulated"])} updateState={updateState} />;
    case "datetime":
      return <CreateDatetime {..._.pick(state, ["columns", "namePopulated"])} updateState={updateState} />;
    case "bins":
      return <CreateBins {..._.pick(state, ["columns", "namePopulated"])} updateState={updateState} />;
    case "random":
      return <CreateRandom {..._.pick(state, ["columns", "namePopulated"])} updateState={updateState} />;
    case "type_conversion":
      return (
        <CreateTypeConversion
          {..._.pick(state, ["columns", "namePopulated"])}
          updateState={updateState}
          prePopulated={_.get(props, "prePopulated.cfg") || {}}
        />
      );
    case "transform":
      return <CreateTransform {..._.pick(state, ["columns", "namePopulated"])} updateState={updateState} />;
    case "winsorize":
      return <CreateWinsorize {..._.pick(state, ["columns", "namePopulated"])} updateState={updateState} />;
    case "zscore_normalize":
      return <CreateZScoreNormalize {..._.pick(state, ["columns", "namePopulated"])} updateState={updateState} />;
  }
  return null;
}

export const BASE_STATE = {
  type: "numeric",
  saveAs: "new",
  name: null,
  cfg: null,
  code: {},
  loadingColumns: true,
  loadingColumn: false,
  namePopulated: false,
};
