PROJECT_ROOT_DIR=`dirname ${0:a:h}`
export PATH="${PROJECT_ROOT_DIR}/bin:$PATH"

docker_exec_dev() {
    docker compose exec -it dev bash -c $@
}

ensure_in_project_root() {
    if [ `pwd` = "$PROJECT_ROOT_DIR" ]; then return 0; fi

    pushd $PROJECT_ROOT_DIR
}
