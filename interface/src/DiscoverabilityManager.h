//
//  DiscoverabilityManager.h
//  interface/src
//
//  Created by Stephen Birarda on 2015-03-09.
//  Copyright 2015 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

#ifndef hifi_DiscoverabilityManager_h
#define hifi_DiscoverabilityManager_h

#include <DependencyManager.h>

class DiscoverabilityManager : public QObject, public Dependency {
    Q_OBJECT
    SINGLETON_DEPENDENCY
    
public slots:
    void updateLocation();
    void removeLocation();    
};

#endif // hifi_DiscoverabilityManager_h