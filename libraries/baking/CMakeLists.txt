set(TARGET_NAME baking)
setup_hifi_library(Concurrent)

link_hifi_libraries(shared shaders graphics networking material-networking graphics-scripting ktx image fbx model-baker task)
include_hifi_library_headers(gpu)
include_hifi_library_headers(hfm)
