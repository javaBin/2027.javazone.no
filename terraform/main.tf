# GENERATED FROM app.yaml — do not edit, changes will be overwritten
module "platform" {
  source = "git::https://github.com/javaBin/platform//terraform/modules/platform-data?ref=main"

  project = "javabin"
  domain  = "javazone.no"
  team    = "javazoneweb"
}

module "ecr" {
  source = "git::https://github.com/javaBin/platform//terraform/modules/ecr-repo?ref=main"

  name = "javazone-2027"
  team = "javazoneweb"
}

module "routing" {
  source = "git::https://github.com/javaBin/platform//terraform/modules/service-routing?ref=main"

  name                   = "javazone-2027"
  team                   = "javazoneweb"
  vpc_id                 = module.platform.vpc_id
  port                   = 8080
  health_check_path      = "/health"
  health_check_matcher   = "200"
  https_listener_arn     = module.platform.https_listener_arn
  listener_rule_priority = 200
  host_header            = "2027.javazone.no"
  route53_zone_id        = module.platform.route53_zone_ids["javazone.no"]
  alb_dns_name           = module.platform.alb_dns_name
  alb_zone_id            = module.platform.alb_zone_id
  deregistration_delay   = 30
}

module "network" {
  source = "git::https://github.com/javaBin/platform//terraform/modules/app-network?ref=main"

  name        = "javazone-2027"
  team        = "javazoneweb"
  project     = "javabin"
  vpc_id      = module.platform.vpc_id
  port        = 8080
  alb_ingress = true
}

module "task_role" {
  source = "git::https://github.com/javaBin/platform//terraform/modules/service-role?ref=main"

  name                     = "javazone-2027"
  team                     = "javazoneweb"
  region                   = "eu-central-1"
  aws_account_id           = "553637109631"
  permissions_boundary_arn = module.platform.developer_boundary_arn
  additional_policy_jsons  = {}
}

module "service" {
  source = "git::https://github.com/javaBin/platform//terraform/modules/ecs-service?ref=main"

  name                     = "javazone-2027"
  team                     = "javazoneweb"
  cluster_id               = module.platform.ecs_cluster_id
  image                    = module.ecr.repository_url
  cpu                      = 256
  memory                   = 512
  port                     = 8080
  desired_count            = 1
  execution_role_arn       = module.platform.execution_role_arn
  task_role_arn            = module.task_role.role_arn
  subnet_ids               = module.platform.private_subnet_ids
  security_group_ids       = [module.network.security_group_id]
  service_registry_arns    = [module.network.registry_arn]
  region                   = "eu-central-1"
  container_user           = "1000"
  readonly_root_filesystem = true
  target_group_arn         = module.routing.target_group_arn
}

module "alarms" {
  source = "git::https://github.com/javaBin/platform//terraform/modules/service-alarm?ref=main"

  name                    = "javazone-2027"
  team                    = "javazoneweb"
  service                 = "javazone-2027"
  cluster_name            = module.platform.ecs_cluster_name
  sns_topic_arns          = [data.aws_sns_topic.alerts.arn]
  cpu_threshold           = 80
  memory_threshold        = 80
  error_5xx_threshold     = 10
  target_group_arn_suffix = module.routing.target_group_arn_suffix
  alb_arn_suffix          = module.platform.alb_arn_suffix
}

data "aws_sns_topic" "alerts" {
  name = "javabin-alerts"
}
