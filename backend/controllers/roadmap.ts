import { Request, Response } from 'express';
import { RequestUser } from '../interfaces/request';
import { IRoadmap } from '../interfaces/roadmap';
import { Roadmap } from '../models/Roadmap';
import { AsyncHandler } from '../middleware/async';
import { RequestAdvancedResults } from '../interfaces/request';
import { ResponseAdvancedResults } from '../interfaces/response';
import { ErrorResponse } from '../utils/errorResponse';

// @desc      Get roadmaps
// @route     GET /api/v1/roadmaps
// @route     GET /api/v1/users/:userId/roadmaps
// @access    Public
export const getRoadmaps = AsyncHandler(
  async (
    req: RequestAdvancedResults,
    res: ResponseAdvancedResults<IRoadmap>,
    next
  ) => {
    if (req.params.userId) {
      const option: { owner: string; private?: string } = {
        owner: req.params.userId,
      };

      if (!req.user || req.user.role !== 'admin') {
        option.private = 'public';
      }

      let roadmaps = await Roadmap.find(option);

      if (!roadmaps) {
        return next(
          new ErrorResponse(
            `Roadmaps not found with user id of ${req.params.userId}`,
            404
          )
        );
      }

      res.status(200).json({ success: true, data: roadmaps });
    } else {
      res.status(200).json(res.advancedResults);
    }
  }
);

// @desc      Get roadmap
// @route     GET /api/v1/roadmaps/:slug
// @access    Public
export const getRoadmap = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    const roadmap: IRoadmap = await Roadmap.findOne({
      slug: req.params.slug,
    }).populate('sections');

    if (!roadmap) {
      return next(
        new ErrorResponse(`Roadmap not found with id of ${req.params.id}`, 404)
      );
    }

    if (roadmap.private === 'private') {
      if (!req.user) {
        return next(
          new ErrorResponse(`You are not the owner of this roadmap`, 401)
        );
      }
      if (
        req.user.role !== 'admin' &&
        roadmap.owner.toString() !== req.user.id
      ) {
        return next(
          new ErrorResponse(`You are not the owner of this roadmap`, 401)
        );
      }
    }

    res.status(200).json({ success: true, data: roadmap });
  }
);

// @desc      Create roadmap
// @route     POST /api/v1/roadmaps
// @access    Private
export const createRoadmap = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    req.body.owner = req.user.id;

    const roadmapOwn = await Roadmap.find({ owner: req.user.id });

    if (roadmapOwn.length > 2) {
      return next(new ErrorResponse('Roadmap limit 3', 400));
    }

    const roadmap = await Roadmap.create(req.body);

    res.status(201).json({ success: true, data: roadmap });
  }
);

// @desc      Update roadmap
// @route     PUT /api/v1/roadmaps/:id
// @access    Private
export const updateRoadmap = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    let roadmap: IRoadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return next(
        new ErrorResponse(`Roadmap not found with id of ${req.params.id}`, 404)
      );
    }

    if (!roadmap.owner === req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`You are not the owner of this roadmap`, 401)
      );
    }

    roadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('sections');

    res.status(200).json({ success: true, data: roadmap });
  }
);

// @desc      Delete roadmap
// @route     DELETE /api/v1/roadmaps/:id
// @access    Private
export const deleteRoadmap = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    let roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return next(
        new ErrorResponse(`Roadmap not found with id of ${req.params.id}`, 404)
      );
    }

    if (!roadmap.owner === req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`You are not the owner of this deck`, 401));
    }

    await roadmap.remove();

    res.status(200).json({ success: true, data: {} });
  }
);

// @desc      Subscribe on roadmap
// @route     GET /api/v1/roadmaps/:id/subscribe
// @access    Private
export const subscribeRoadmap = AsyncHandler(
  async (req: RequestUser, res: Response, next) => {
    let roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return next(
        new ErrorResponse(`Roadmap not found with id of ${req.params.id}`, 404)
      );
    }

    let subscribers = [...roadmap.subscribers];

    if (roadmap.subscribers.indexOf(req.user.id) == -1) {
      subscribers.push(req.user.id);
    } else {
      subscribers = subscribers.filter(
        (subscriber) => subscriber.toString() !== req.user.id.toString()
      );
    }

    roadmap = await Roadmap.findByIdAndUpdate(
      req.params.id,
      {
        subscribers: subscribers,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ success: true, data: roadmap });
  }
);
