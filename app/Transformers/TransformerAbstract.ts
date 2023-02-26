import { Dictionary } from "@ioc:Adonis/Lucid/Database";
import { isArray, uniq } from "lodash";

export abstract class TransformerAbstract<T> {
  protected defaultIncludes: string[] = [];
  protected availableIncludes: string[] = [];
  protected includesTransformerMapping: {} = {};

  // Transform Single Object
  public transform(model: T, includes?: string[]): Dictionary<any> {
    const allIncludes = includes?.length
      ? uniq(includes.concat(this.defaultIncludes))
      : this.defaultIncludes;
    if (!this._checkIncludes(allIncludes, this.availableIncludes)) {
    }
    return this._mapModelWithIncludes(model, allIncludes, this.includesTransformerMapping);
  }

  // Transform Array
  public transformList(models: T[], includes?: string[]): Dictionary<any>[] {
    const allIncludes = includes?.length
      ? uniq(includes.concat(this.defaultIncludes))
      : this.defaultIncludes;
    if (!this._checkIncludes(allIncludes, this.availableIncludes)) {
      // throw new IncludeNotPresentInAvailableIncludesException();
    }
    return models.map((model) => {
      return this._mapModelWithIncludes(model, allIncludes, this.includesTransformerMapping);
    });
  }

  protected abstract _map(model: T): Dictionary<any>;

  // Check the presence of required includes in available includes
  private _checkIncludes(modelIncludes: string[], availableIncludes: string[]): boolean {
    for (const include of modelIncludes) {
      if (!availableIncludes.includes(include)) {
        return false;
      }
    }
    return true;
  }

  private _mapModelWithIncludes(
    model: T,
    includes?: string[],
    includesTransformerMap?: object
  ): Dictionary<any> {
    let mappedModel = this._map(model);

    if (includes && includesTransformerMap) {
      for (const include of includes) {
        let transformedInclude;
        if (isArray(model[include])) {
          transformedInclude = new includesTransformerMap[include]().transformList(model[include]);
        } else if (model[include]) {
          // todo - Check for empty data in a model
          transformedInclude = new includesTransformerMap[include]().transform(model[include]);
        } else {
          transformedInclude = null;
        }
        // Append include to model object
        mappedModel = {
          ...mappedModel,
          [include]: transformedInclude,
        };
      }
      return mappedModel;
    }
    return {};
  }
}
