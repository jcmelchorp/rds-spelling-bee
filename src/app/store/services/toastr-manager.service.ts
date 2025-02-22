import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { EntityAction, EntityCacheAction, EntityOp, ofEntityOp, ofEntityType, OP_ERROR, OP_SUCCESS } from '@ngrx/data';
import { Actions, ofType } from '@ngrx/effects';

import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ToastrManagerService {
  isBrowser = false;
  constructor(
    actions$: Actions,
    private readonly _toasterService: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    actions$
      .pipe(ofType(EntityCacheAction.SAVE_ENTITIES,EntityCacheAction.LOAD_COLLECTIONS),
        ofEntityOp(),
        filter(
          (ea: EntityAction) =>
            ea.payload.entityOp.endsWith(OP_SUCCESS) || ea.payload.entityOp.endsWith(OP_ERROR)
        )
      )
      // this service never dies so no need to unsubscribe
      .subscribe(action =>
        _toasterService.success(`${action.payload.entityName} action`, action.payload.entityOp)
      );

    actions$
      .pipe(ofType(EntityCacheAction.SAVE_ENTITIES_SUCCESS, EntityCacheAction.SAVE_ENTITIES_ERROR))
      .subscribe((action: any) =>
        _toasterService.info(`${action.type} - url: ${action.payload.url}`, 'SaveEntities')
      );
  
    // actions$.pipe(
    //   ofEntityOp(EntityOp.QUERY_ALL),
    //   filter(
    //     (ea: EntityAction) =>
    //     (ea.payload.entityOp.endsWith(OP_SUCCESS) && !ea.payload.entityOp.includes('query') 
    //     ))
    // )
    //   // this service never dies so no need to unsubscribe
    //   .subscribe(action =>
    //     _toasterService.info(
    //       `${action.payload.entityOp} action`,
    //       action.payload.entityName
    //     )
    //   );

    // actions$.pipe(
    //   ofEntityOp(),
    //   filter(
    //     (ea: EntityAction) =>
    //       ea.payload.entityOp.endsWith(OP_ERROR)
    //   )
    // )
    //   // this service never dies so no need to unsubscribe
    //   .subscribe(action =>
    //     _toasterService.info(
    //       `${action.payload.entityName} action`,
    //       action.payload.entityOp
    //     )
    //   );


    actions$
      .pipe(ofType(EntityCacheAction.SAVE_ENTITIES_SUCCESS))
      .subscribe((action: any) =>
        _toasterService.success(`${action.type} - url: ${action.payload.url}`, 'SaveEntities')
      );

    actions$
      .pipe(ofType(EntityCacheAction.SAVE_ENTITIES_ERROR))
      .subscribe((action: any) =>
        _toasterService.error(`${action.type} - url: ${action.payload.url}`, 'SaveEntities')
      );
  }


}
